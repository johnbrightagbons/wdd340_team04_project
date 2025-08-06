import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import connectDB from '@/app/lib/database'
import User from '@/app/models/User'
import { hashPassword, generateToken, setTokenCookie } from '@/app/lib/auth'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  isArtisan: z.boolean().optional().default(false)
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email })
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      isArtisan: validatedData.isArtisan || false
    })

    await user.save()

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      isArtisan: user.isArtisan
    })

    // Set cookie
    setTokenCookie(token)

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      isArtisan: user.isArtisan,
      profileImage: user.profileImage,
      createdAt: user.createdAt
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      data: userResponse
    })

  } catch (error) {
    console.error('Registration error:', error)
    
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