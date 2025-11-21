import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { companyName, name, email, phone, inquiryType, message } = await req.json()

    const { error } = await resend.emails.send({
      from: 'info@heaven-labs.net',
      to: 'info@twtsn.co.jp',
      replyTo: email,
      subject: `【エンタープライズお問い合わせ】${companyName} - ${inquiryType}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #C85A54; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 20px;">エンタープライズお問い合わせ</h1>
          </div>
          <div style="background-color: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; width: 120px;">企業名</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold;">${companyName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">お名前</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">メール</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #C85A54;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">電話番号</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">お問い合わせ内容</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${inquiryType}</td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <p style="color: #666; margin-bottom: 8px; font-weight: bold;">メッセージ</p>
              <div style="background-color: #f5f5f5; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
