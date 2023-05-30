import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import Model from './model.entity'
import { UserEntity } from './user.entity'
import { PaymentMethodTypeEnum } from '../utils/enums'

@Entity('payment_methods')
export class PaymentMethodEntity extends Model {
   @Column({
      type: 'enum',
      enum: PaymentMethodTypeEnum,
   })
   type: PaymentMethodTypeEnum

   @OneToOne((type) => UserEntity, (user) => user.id)
   @JoinColumn({ name: 'userId' })
   user: UserEntity

   @Column()
   userId: string

   @Column({
      type: 'varchar',
      unique: true,
   })
   tokenizedPayment: string

   @Column({
      type: 'int',
      unique: true,
   })
   paymentSourceId: number
}
