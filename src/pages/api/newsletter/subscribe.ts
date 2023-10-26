import type { NextApiRequest, NextApiResponse } from 'next'
import Odoo from 'odoo-await'
import * as yup from 'yup'
import { settle } from '../../../utils/promise.utils'

const formSchema = yup.object().shape({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().email().required(),
})

const {
  ODOO_DB = '',
  ODOO_USERNAME = '',
  ODOO_BASE_URL = '',
  ODOO_API_KEY = '',
} = process.env

const ODOO_MAILING_LIST_ID = parseInt(
  process.env.ODOO_MAILING_LIST_ID || '0',
  10,
)

const client = new Odoo({
  db: ODOO_DB,
  username: ODOO_USERNAME,
  baseUrl: ODOO_BASE_URL,
  password: ODOO_API_KEY,
})

const isSubscribed = async (
  client: Odoo,
  mailingListId: number,
  email: string,
) => {
  const [subscription] = await client.search('mailing.contact.subscription', [
    ['list_id', '=', mailingListId],
    ['contact_id.email', '=', email],
  ])

  return [!!subscription, subscription]
}

const createContact = async (
  client: Odoo,
  payload: {
    firstName?: string
    lastName?: string
    email: string
  },
) => {
  const name =
    [payload.firstName, payload.lastName].join(' ').trim() || payload.email

  let [contact] = await client.search('mailing.contact', [
    'email',
    '=',
    payload.email,
  ])

  if (!contact) {
    contact = await client.create('mailing.contact', {
      name: name,
      email: payload.email,
      x_first_name: payload.firstName,
      x_last_name: payload.lastName,
    })
  }

  return contact
}

const subscribe = async (
  client: Odoo,
  contactId: number,
  mailingListId: number,
) => {
  const subscription = await client.create('mailing.contact.subscription', {
    contact_id: contactId,
    list_id: mailingListId,
  })

  return subscription
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const [payload, err] = await settle(() => formSchema.validate(req.body))

  if (err)
    return res.status(400).json({
      message: err.message,
      data: {},
    })

  await client.connect()

  const [subscribed] = await isSubscribed(
    client,
    ODOO_MAILING_LIST_ID,
    payload.email,
  )

  if (subscribed) {
    return res.status(200).json({
      message: 'already subscribed',
      data: {},
    })
  }

  const contact = await createContact(client, payload)
  await subscribe(client, contact, ODOO_MAILING_LIST_ID)

  res.status(200).json({
    message: 'Subscribed successfully!',
  })
}
