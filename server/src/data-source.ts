import "reflect-metadata"
import { DataSource } from "typeorm"
import { Dentist } from "./entity/Dentist"
import { Intervention } from "./entity/Intervention"
import { InterventionItem } from "./entity/InterventionItem"
import { Ordination } from "./entity/Ordination"
import { Service } from "./entity/Service"
import { User } from "./entity/User"
import { users1663089750515 } from "./migration/1663089750515-users"
import { dentists1663090355775 } from "./migration/1663090355775-dentists"
import { ordinations1663090730523 } from "./migration/1663090730523-ordinations"
import { services1663091052283 } from "./migration/1663091052283-services"
import { interventions1663091835006 } from "./migration/1663091835006-interventions"
import { itemquantity1663352940019 } from "./migration/1663352940019-itemquantity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: "dentist",
    logging: false,
    entities: [User, Dentist, Ordination, Service, Intervention, InterventionItem],
    migrations: [users1663089750515, dentists1663090355775, ordinations1663090730523, services1663091052283, interventions1663091835006, itemquantity1663352940019],
    subscribers: [],
})
