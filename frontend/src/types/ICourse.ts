export enum CourseLevel {
    LEVEL1 = '1',
    LEVEL2 = '2',
    LEVEL3 = '3',
    LEVEL4 = '4',  
    LEVEL5 = '5',
    OPEN = 'Open',
}

export enum Location {
  ONLINE = 'ONLINE',
  STUDIO1 = 'Studio 1',
  STUDIO2 = 'Studio 2',
  STAGE = 'Stage',
  GYM = 'Gym',
}

export enum StudioType {
  LIVE = 'Live',
  VIRTUAL = 'Virtual',
}

export enum ProgramType {
  COURSE = 'Course',
  CLASS = 'Class',
  WORKSHOP = 'Workshop',
  EVENT = 'Event',
  PERFORMANCE = 'Performance',
  INTENSIVE = 'Intensive',
  PRIVATE = 'Private Session',
}

export enum Teacher {
  EmilyJohnson = "Emily Johnson",
  CarlosRamirez = "Carlos Ramirez",
  OliviaWilliams = "Olivia Williams",
  EthanPatel = "Ethan Patel",
  SophiaKim = "Sophia Kim"
}

export interface ISession {
  date: string; // ISO format "YYYY-MM-DD" or UNIX timestamp
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface ICourse {
  id: string;
  title: string;
  start: Date;
  allDay?: boolean;
  url?: string;
  overlap: true;
  editable: false;
  extendedProps: {
    level: CourseLevel;
    description: string;
    longDescription: string;
    teacher?: Teacher;
    image?: string;
    tags: string[];
    schedule: ISession[];
    duration?: string;
    location: Location; 
    studioType: StudioType;
    programType: ProgramType;
    isEnrolled?: boolean;
    eventType: 'course';
  }
}

export interface IUserEvent {
  id: string;
  userId: string;
  title: string;
  start: Date;
  allDay?: boolean;
  url?: string;
  overlap: true;
  editable: true;
  extendedProps: {
    description?: string;
    longDescription?: string;
    schedule: ISession[]; 
    location?: Location; 
    studioType?: StudioType;
    programType?: ProgramType;
    isEnrolled: true;
    eventType: 'custom';

  }
}

// merged properties of ICourse and IUserEvent
export interface IEvent {
  id: string;
  userId?: string;
  title: string;
  start: Date;
  allDay?: boolean;
  url?: string;
  overlap: true;
  editable: boolean;
  extendedProps: {
    level?: CourseLevel;
    description?: string;
    longDescription?: string;
    teacher?: Teacher;
    image?: string;
    tags?: string[];
    schedule: ISession[]; 
    duration?: string;
    location?: Location; 
    studioType?: StudioType;
    programType?: ProgramType;
    isEnrolled?: boolean;
    eventType: 'course' | 'custom';
  }
}