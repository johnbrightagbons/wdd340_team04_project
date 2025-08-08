import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/app/lib/prisma'
import { comparePassword, generateToken, setTokenCookie } from '@/app/lib/auth'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        artisanProfile: {
          include: {
            specialties: true
          }
        }
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await comparePassword(validatedData.password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      isArtisan: user.isArtisan
    })

    // Set cookie
    await setTokenCookie(token)

    // Return user data (without password)
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      isArtisan: user.isArtisan,
      artisanProfile: user.artisanProfile,
      createdAt: user.createdAt
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: userResponse
    })

  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 