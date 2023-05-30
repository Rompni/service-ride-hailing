import {
   BaseEntity,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm'

@Entity()
export default abstract class Model extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string

   @CreateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
   })
   createAt: Date

   @UpdateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
   })
   updatedAt: Date
}
