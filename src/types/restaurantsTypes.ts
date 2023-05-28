export interface createRestaurant {
  id?: string
  name: string
  number: number
  street: string
  city: string
  type: string
  password: string
  cellphone: string
  socialMidea?: string
  link?: string
}

export interface updateRestaurant {
  name?: string
  number?: number
  street?: string
  city?: string
  type?: string
  password?: string
  cellphone?: string
  socialMidea?: string
  link?: string
}


