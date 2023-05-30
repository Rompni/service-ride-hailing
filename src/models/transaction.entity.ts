import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import Model from './model.entity'
import { RideEntity } from './ride.entity'

@Entity({ name: 'transactions' })
export class TransactionEntity extends Model {
   @Column({
      type: 'int',
   })
   amount_in_cents: number

   @Column()
   reference: string

   @Column()
   currency: string

   @Column()
   status: string

   @Column({ nullable: true })
   status_message: string

   @ManyToOne((type) => RideEntity, (ride) => ride.id)
   @JoinColumn({ name: 'rideId' })
   ride: RideEntity

   @Column()
   rideId: string
}
