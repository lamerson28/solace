import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AdvocatesTable } from '../AdvocatesTable'

describe('AdvocatesTable', () => {
  const mockAdvocates = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      city: 'New York',
      degree: 'Ph.D.',
      specialties: ['Psychology', 'Counseling'],
      yearsOfExperience: 5,
      phoneNumber: '123-456-7890',
      createdAt: new Date()
    }
  ]

  it('renders table headers correctly', () => {
    render(<AdvocatesTable advocates={mockAdvocates} />)
    
    expect(screen.getByText('First Name')).toBeInTheDocument()
    expect(screen.getByText('Last Name')).toBeInTheDocument()
    expect(screen.getByText('City')).toBeInTheDocument()
    expect(screen.getByText('Degree')).toBeInTheDocument()
    expect(screen.getByText('Specialties')).toBeInTheDocument()
    expect(screen.getByText('Years of Experience')).toBeInTheDocument()
    expect(screen.getByText('Phone Number')).toBeInTheDocument()
  })

  it('renders advocate data correctly', () => {
    render(<AdvocatesTable advocates={mockAdvocates} />)
    
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Doe')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(screen.getByText('Ph.D.')).toBeInTheDocument()
    expect(screen.getByText('Psychology')).toBeInTheDocument()
    expect(screen.getByText('Counseling')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()
  })
}) 