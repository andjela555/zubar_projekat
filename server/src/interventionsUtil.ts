import { Dentist } from "./entity/Dentist";
import { Intervention } from "./entity/Intervention";
import { Service } from "./entity/Service";
import { User } from "./entity/User";

export interface InterventionDto {
  id: number,
  user: User,
  createdAt: Date,
  status: 'pending' | 'accepted' | 'rejected' | 'finished',
  dentist: Dentist,
  start: Date,
  end?: Date,
  items?: InterventionItemDto[]
}

export interface InterventionItemDto {
  id: number,
  unitPrice: number,
  quantity: number,
  service: Service
}

export function fromIntervention(intervention: Intervention) {
  return {
    id: intervention.id,
    user: intervention.user,
    createdAt: intervention.createdAt,
    status: intervention.status,
    dentist: intervention.dentist,
    start: intervention.start,
    end: intervention.end,
    items: intervention.items ? intervention.items.map(item => {
      return {
        id: item.id,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        service: item.service,
      }
    }) : undefined
  } as InterventionDto
}