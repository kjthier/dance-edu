import { ICourse, IUserEvent, Teacher, CourseLevel, Location, StudioType, ProgramType } from '../types/ICourse';
import PlaceholderImg from '../assets/course-card-img.jpg';

export const mockCourses: ICourse[] = [
  {
    id: "1",
    title: "Ballet",
    start: new Date(),
    allDay: true,
    url: "",
    overlap: true,
    editable: false,
    extendedProps: {
      level: CourseLevel.LEVEL1,
      description: "Introductory course to Ballet",
      longDescription: "This is a longer description",
      teacher: Teacher.EmilyJohnson,
      image: PlaceholderImg,
      tags: ["ballet", "beginner"],
      schedule: [{ date: "2023-09-03", startTime: "10:00", endTime: "12:00" }],
      duration: "2 hours",
      location: Location.STUDIO1,
      studioType: StudioType.LIVE,
      programType: ProgramType.CLASS,
      isEnrolled: true,
      eventType: 'course',
    },
  },
];


// Mock data for custom user events (editable events)
export const mockUserEvents: IUserEvent[] = [
  {
    id: "2",
    userId: "user1",
    title: "Custom Event",
    start: new Date(),
    allDay: true,
    url: "",
    overlap: true,
    editable: true,
    extendedProps: {
      description: "This is my custom event",
      longDescription: "This is a longer description for my custom event",
      schedule: [{ date: "2023-09-03", startTime: "14:00", endTime: "16:00" }],
      location: Location.STUDIO2,
      studioType: StudioType.LIVE,
      programType: ProgramType.EVENT,
      isEnrolled: true,
      eventType: 'custom',
    },
  },
];

//   {
//     id: 1,
//     title: "Beginner Ballet",
//     level: CourseLevel.LEVEL1,
//     description: "Learn the fundamentals of ballet, perfect for beginners.",
//     teacher: Teacher.EmilyJohnson,
//     image: PlaceholderImg,
//     tags: ["ballet", "beginner"],
//     schedule: [
//       {
//         date: '2023-09-10',
//         startTime: '09:00',
//         endTime: '10:00',
//       }
//     ],
//     duration: '60 min',
//     location: Location.STUDIO1,
//     studioType: StudioType.LIVE,
//     programType: ProgramType.COURSE,
//     isEnrolled: true,
//   },
//   {
//     id: 2,
//     title: "Hip-hop Basics",
//     level: CourseLevel.LEVEL2,
//     description: "Get introduced to Hip-hop dance techniques.",
//     teacher: Teacher.CarlosRamirez,
//     image: PlaceholderImg,
//     tags: ["hip-hop", "beginner"],
//     schedule: [
//       {
//         date: '2023-09-11',
//         startTime: '15:00',
//         endTime: '16:00',
//       }
//     ],
//     duration: '60 min',
//     location: Location.STUDIO2,
//     studioType: StudioType.LIVE,
//     programType: ProgramType.CLASS,
//     isEnrolled: true,
//   },
//   {
//     id: 3,
//     title: "Salsa Advanced",
//     level: CourseLevel.LEVEL4,
//     description: "Master complex salsa moves and techniques.",
//     teacher: Teacher.OliviaWilliams,
//     image: PlaceholderImg,
//     tags: ["salsa", "advanced"],
//     schedule: [
//       {
//         date: '2023-09-12',
//         startTime: '18:00',
//         endTime: '19:30',
//       },
//       {
//         date: '2023-09-19',
//         startTime: '18:00',
//         endTime: '19:30',
//       }
//     ],
//     duration: '',
//     location: Location.STAGE,
//     studioType: StudioType.LIVE,
//     programType: ProgramType.WORKSHOP,
//     isEnrolled: false,
//   },
//   {
//     id: 4,
//     title: "Panel Discussion: The Future of Ballet",
//     level: CourseLevel.OPEN,
//     description: "lorem ipsum dolor sit amet",
//     teacher: Teacher.EthanPatel,
//     image: PlaceholderImg,
//     tags: ["ballet", "discussion", "panel"],
//     schedule: [
//       {
//         date: '2023-09-13',
//         startTime: '11:00',
//         endTime: '12:00',
//       }
//     ],
//     duration: '60 min',
//     location: Location.ONLINE,
//     studioType: StudioType.VIRTUAL,
//     programType: ProgramType.EVENT,
//     isEnrolled: false,
//   },
// ]

// export default mockCourses
