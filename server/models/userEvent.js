import mongoose from "mongoose"

const userEventSchema = new mongoose.Schema({
    userId: String,
    title: String,
    start: Date,
    allDay: Boolean,
    url: String,
    overlap: Boolean,
    editable: Boolean,
    extendedProps: {
        description: String,
        longDescription: String,
        schedule: [SessionSchema],
        location: String,
        studioType: String,
        programType: String,
        isEnrolled: Boolean,
        eventType: String
    }
})

export default mongoose.model('UserEvent', userEventSchema)