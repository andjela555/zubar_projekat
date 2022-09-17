
import * as express from "express"
import { AppDataSource } from "./data-source"
import * as cors from 'cors';
import authRouter from './routers/auth'
import serviceRouter from './routers/service'
import funfactRouter from './routers/funfact'
import ordinationRouter from './routers/ordination'
import dentistRouter from './routers/dentist'
import statisticsRouter from './routers/statistics'
import patientInterventionRouter from './routers/patientInterventions'
import technitianInterventionRouter from './routers/technitianInterventions'
import * as jwt from 'jsonwebtoken'
import { User } from "./entity/User";
AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(express.json())
    app.use(cors({
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        origin: 'http://localhost:3000'
    }));
    app.use('/auth', authRouter)

    app.use(async (req, res, next) => {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json({ error: 'unauthorized' })
            return;
        }
        const splited = authorization.split(' ');
        if (splited.length !== 2 || splited[0] !== 'Bearer') {
            res.status(401).json({ error: 'unauthorized' })
            return;
        }
        const token = splited[1];
        try {
            const userId = jwt.verify(token, process.env.JWT_SECRET || 'tokkkeennn') as { id: number };
            const user = await AppDataSource.getRepository(User).findOne({
                where: { id: userId.id }
            });
            if (!user) {
                res.status(401).json({ error: 'unauthorized' })
                return;
            }
            (req as any).user = user;
            next();
        } catch (error) {
            res.status(401).json({ error: 'unauthorized' })
        }
    })
    app.get('/check', (req, res) => {
        res.json((req as any).user);
    })
    app.use('/service', serviceRouter)
    app.use('/funfact', funfactRouter)
    app.use('/ordination', ordinationRouter)
    app.use('/dentist', dentistRouter)
    app.use('/patient/interventions', patientInterventionRouter)
    app.use('/technitian/interventions', technitianInterventionRouter)
    app.use('/statistics', statisticsRouter)

    app.listen(8000, () => {
        console.log("Server has successfully started")
    })

}).catch(error => console.log(error))
