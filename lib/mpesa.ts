import axios from 'axios'

interface MpesaConfig {
  consumerKey: string
  consumerSecret: string
  environment: 'sandbox' | 'production'
  shortcode: string
  passkey: string
}

const mpesaConfig: MpesaConfig = {
  consumerKey: process.env.MPESA_CONSUMER_KEY!,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET!,
  environment: (process.env.MPESA_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  shortcode: process.env.MPESA_SHORTCODE || '174379',
  passkey: process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
}

const getBaseUrl = () => {
  return mpesaConfig.environment === 'sandbox' 
    ? 'https://sandbox.safaricom.co.ke' 
    : 'https://api.safaricom.co.ke'
}

export const getAccessToken = async (): Promise<string> => {
  try {
    const auth = Buffer.from(`${mpesaConfig.consumerKey}:${mpesaConfig.consumerSecret}`).toString('base64')
    
    const response = await axios.get(`${getBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    })

    return response.data.access_token
  } catch (error) {
    console.error('Error getting M-Pesa access token:', error)
    throw error
  }
}

export const generatePassword = (): string => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
  const password = Buffer.from(`${mpesaConfig.shortcode}${mpesaConfig.passkey}${timestamp}`).toString('base64')
  return password
}

export const getTimestamp = (): string => {
  return new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
}

export const initiateSTKPush = async (
  phoneNumber: string,
  amount: number,
  accountReference: string,
  transactionDesc: string,
  callbackUrl: string
) => {
  try {
    const accessToken = await getAccessToken()
    const timestamp = getTimestamp()
    const password = generatePassword()

    // Format phone number (remove + and ensure it starts with 254)
    const formattedPhone = phoneNumber.replace(/^\+/, '').replace(/^0/, '254')

    const requestBody = {
      BusinessShortCode: mpesaConfig.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: mpesaConfig.shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc
    }

    const response = await axios.post(
      `${getBaseUrl()}/mpesa/stkpush/v1/processrequest`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error initiating STK push:', error)
    throw error
  }
}

export const querySTKStatus = async (checkoutRequestId: string) => {
  try {
    const accessToken = await getAccessToken()
    const timestamp = getTimestamp()
    const password = generatePassword()

    const requestBody = {
      BusinessShortCode: mpesaConfig.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId
    }

    const response = await axios.post(
      `${getBaseUrl()}/mpesa/stkpushquery/v1/query`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error querying STK status:', error)
    throw error
  }
}
