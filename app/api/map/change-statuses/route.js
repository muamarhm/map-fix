import { NextResponse } from 'next/server'
import { db } from '@/lib/database/knex'

export async function POST(req) {
  try {
    const body = await req.json()
    const { status, name } = body

    const statuses = status == 'Open' ? false : true
    await db('maps').update('status', statuses).where({
      name,
    })
    return NextResponse.json({
      message: 'successs',
      statuses,
    })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
