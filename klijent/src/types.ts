
export interface Dentist {
  id: number,
  firstName: string,
  lastName: string,
  phone: string,
  ordination: Ordination
}


export interface Ordination {
  id: number,
  address: string,
  phone: string,
  email: string
}

export interface Service {
  id: number,
  name: string,
  description: string,
  price: number
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  birthDate: string,
  type: 'patient' | 'technitian'
}

export interface Intervention {
  id: number,
  user: User,
  createdAt: string,
  status: 'pending' | 'accepted' | 'rejected' | 'finished',
  dentist?: Dentist,
  start: string,
  end?: string,
  items: InterventionItem[]
}
export interface ChangeInterventinDto {
  start: Date,
  end: Date,
  dentistId: number,
  status: 'pending' | 'accepted' | 'rejected' | 'finished',
  items: ChangeItemDto[]
}
interface ChangeItemDto {
  type: 'UPDATE' | 'CREATE' | 'DELETE',
  id?: number,
  quantity?: number,
  serviceId?: number
}

export interface InterventionItem {
  id: number,
  unitPrice: number,
  quantity: number,
  service: Service
}

export interface UserRes {
  user: User,
  token: string
}

export interface InterventionResult {
  totalElements: number,
  interventions: Intervention[]
}