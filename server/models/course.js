import mongoose from 'mongoose'
import { SessionSchema } from '../models/session.js'

const CourseLevel = {
    LEVEL1: '1',
    LEVEL2: '2',
    LEVEL3: '3',
    LEVEL4: '4',  
    LEVEL5: '5',
    OPEN: 'Open',
}

const Location = {
    ONLINE: 'ONLINE',
    STUDIO1: 'Studio 1',
    STUDIO2: 'Studio 2',
    STAGE: 'Stage',
    GYM: 'Gym',
}

const StudioType = {
    LIVE: 'Live',
    VIRTUAL: 'Virtual',
}

const ProgramType = {
    COURSE: 'Course',
    CLASS: 'Class',
    WORKSHOP: 'Workshop',
    EVENT: 'Event',
    PERFORMANCE: 'Performance',
    INTENSIVE: 'Intensive',
    PRIVATE: 'Private Session',
}

const Teacher = {
    EmilyJohnson: "Emily Johnson",
    CarlosRamirez: "Carlos Ramirez",
    OliviaWilliams: "Olivia Williams",
    EthanPatel: "Ethan Patel",
    SophiaKim: "Sophia Kim"
}

const CourseSchema = new mongoose.Schema({
    title: String,
    start: Date,
    allDay: Boolean,
    url: String,
    overlap: Boolean,
    editable: Boolean,
    extendedProps: {
        level: String,
        description: String,
        longDescription: String,
        teacher: String,
        image: String,
        tags: [String],
        schedule: [SessionSchema],
        duration: String,
        location: String,
        studioType: String,
        programType: String,
        isEnrolled: Boolean,
        eventType: String
    }
})

export default mongoose.model('Course', CourseSchema)


