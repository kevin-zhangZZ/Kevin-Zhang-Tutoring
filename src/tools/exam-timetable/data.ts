// The 2026 VCE written examination timetable, transcribed from VCAA's published timetable
// (vcaa.vic.edu.au/administration/key-dates/vce-examination-timetable, page dated 7 Oct 2026).
// Times include the reading period. Oral, performance and Extended Investigation assessments
// aren't here: VCAA gives each student their own time on an advice slip.
//
// Each session lists the exams in it by their VCAA names. "… Examination 1/2" is split into the
// subject and its paper, so Methods, Specialist and General Maths are one subject with two papers.

export const YEAR = 2026
export const SOURCE_URL = 'https://www.vcaa.vic.edu.au/administration/key-dates/vce-examination-timetable'

interface RawSession {
  date: string
  start: string
  end: string
  exams: string[]
  note?: string
}

const RAW: RawSession[] = [
  { date: '2026-10-15', start: '09:25', end: '12:30', exams: ['Classical Hebrew'] },
  { date: '2026-10-15', start: '14:00', end: '16:10', exams: ['Armenian', 'Bengali', 'Bosnian', 'Chin Hakha', 'Croatian', 'Dutch', 'Filipino', 'Hebrew', 'Hindi', 'Hungarian', 'Karen', 'Khmer', 'Macedonian', 'Persian', 'Polish', 'Portuguese', 'Punjabi', 'Romanian', 'Russian', 'Serbian', 'Sinhala', 'Swedish', 'Tamil', 'Turkish'] },
  { date: '2026-10-15', start: '08:00', end: '18:00', exams: ['Auslan'], note: 'One two-hour session, time set per student' },
  { date: '2026-10-16', start: '13:55', end: '17:00', exams: ['Classical Greek'] },
  { date: '2026-10-27', start: '09:00', end: '12:15', exams: ['English', 'English as an Additional Language (EAL)'] },
  { date: '2026-10-28', start: '09:00', end: '10:45', exams: ['Agricultural and Horticultural Studies'] },
  { date: '2026-10-28', start: '11:45', end: '13:30', exams: ['Art Making and Exhibiting'] },
  { date: '2026-10-28', start: '15:00', end: '17:15', exams: ['English Language', 'Indonesian First Language', 'Vietnamese First Language'] },
  { date: '2026-10-29', start: '09:00', end: '10:45', exams: ['VET Business', 'VET Community Services', 'Theatre Studies'] },
  { date: '2026-10-29', start: '11:45', end: '14:00', exams: ['Economics'] },
  { date: '2026-10-29', start: '15:00', end: '17:15', exams: ['Chinese First Language', 'Japanese First Language', 'Korean First Language', 'Literature'] },
  { date: '2026-10-30', start: '09:00', end: '11:45', exams: ['Psychology'] },
  { date: '2026-10-30', start: '14:00', end: '15:45', exams: ['General Mathematics Examination 1'] },
  { date: '2026-11-02', start: '09:00', end: '11:45', exams: ['Biology'] },
  { date: '2026-11-02', start: '14:00', end: '15:45', exams: ['General Mathematics Examination 2'] },
  { date: '2026-11-04', start: '09:00', end: '10:45', exams: ['Art Creative Practice', 'VET Engineering Studies', 'VET Health Allied', 'VET Health Services Assistance'] },
  { date: '2026-11-04', start: '11:45', end: '14:00', exams: ['Aboriginal Languages of Victoria', 'Algorithmics (HESS)', 'Classical Studies', 'Korean Second Language', 'Vietnamese Second Language'] },
  { date: '2026-11-04', start: '15:00', end: '17:15', exams: ['Business Management'] },
  { date: '2026-11-05', start: '09:00', end: '10:15', exams: ['Mathematical Methods Examination 1', 'Music Composition'] },
  { date: '2026-11-05', start: '11:45', end: '13:30', exams: ['VET Equine Studies', 'VET Hospitality'] },
  { date: '2026-11-05', start: '15:00', end: '17:15', exams: ['Chinese Language, Culture and Society', 'Health and Human Development'] },
  { date: '2026-11-06', start: '09:00', end: '10:45', exams: ['Dance', 'VET Integrated Technologies'] },
  { date: '2026-11-06', start: '11:45', end: '14:00', exams: ['Mathematical Methods Examination 2'] },
  { date: '2026-11-06', start: '15:00', end: '17:15', exams: ['Arabic', 'Legal Studies', 'VET Creative and Digital Media'] },
  { date: '2026-11-09', start: '09:00', end: '10:15', exams: ['Music Inquiry', 'Specialist Mathematics Examination 1'] },
  { date: '2026-11-09', start: '11:45', end: '14:00', exams: ['Applied Computing: Data Analytics', 'Physical Education', 'Spanish'] },
  { date: '2026-11-09', start: '15:00', end: '17:15', exams: ['History: Revolutions', 'Industry and Enterprise'] },
  { date: '2026-11-10', start: '09:00', end: '11:45', exams: ['Chemistry'] },
  { date: '2026-11-10', start: '14:00', end: '16:15', exams: ['Environmental Science', 'Greek', 'Media', 'Texts and Traditions'] },
  { date: '2026-11-11', start: '09:00', end: '10:45', exams: ['VET Furnishing', 'Visual Communication Design'] },
  { date: '2026-11-11', start: '11:45', end: '14:00', exams: ['History: Australian History', 'Outdoor and Environmental Studies', 'Specialist Mathematics Examination 2'] },
  { date: '2026-11-11', start: '15:00', end: '17:15', exams: ['Accounting'] },
  { date: '2026-11-12', start: '09:00', end: '11:45', exams: ['Physics'] },
  { date: '2026-11-12', start: '14:00', end: '16:15', exams: ['History: Ancient History', 'Geography', 'Sociology'] },
  { date: '2026-11-13', start: '09:00', end: '10:45', exams: ['Product Design and Technologies', 'VET Information and Communications Technology', 'VET Music (Sound Production)'] },
  { date: '2026-11-13', start: '11:45', end: '13:30', exams: ['Drama', 'VET Sport and Recreation'] },
  { date: '2026-11-13', start: '15:00', end: '17:15', exams: ['Applied Computing: Software Development', 'German', 'Philosophy'] },
  { date: '2026-11-16', start: '09:00', end: '10:45', exams: ['Food Studies'] },
  { date: '2026-11-16', start: '11:45', end: '13:30', exams: ['VET Hospitality (Cookery)', 'VET Laboratory Skills', 'Systems Engineering'] },
  { date: '2026-11-16', start: '15:00', end: '17:15', exams: ['Latin', 'Politics', 'Religion and Society'] },
  { date: '2026-11-17', start: '09:00', end: '10:15', exams: ['Music Contemporary Performance', 'Music Repertoire Performance'] },
  { date: '2026-11-17', start: '11:45', end: '14:00', exams: ['Indonesian Second Language', 'Italian'] },
  { date: '2026-11-17', start: '15:00', end: '17:15', exams: ['Foundation Mathematics', 'French'] },
  { date: '2026-11-18', start: '09:00', end: '11:15', exams: ['Japanese Second Language'] },
  { date: '2026-11-18', start: '14:00', end: '16:15', exams: ['Chinese Second Language', 'Chinese Second Language Advanced'] },
]

/** Days in the exam period with no exams, shown on the calendar. */
export const HOLIDAYS: Record<string, string> = { '2026-11-03': 'Melbourne Cup public holiday' }

export type Category =
  | 'English' | 'Mathematics' | 'Sciences' | 'Humanities' | 'Business' | 'Arts'
  | 'Technology' | 'Health & PE' | 'Languages' | 'VET'

export const CATEGORIES: Category[] = ['English', 'Mathematics', 'Sciences', 'Languages', 'Humanities', 'Business', 'Health & PE', 'Arts', 'Technology', 'VET']

const CATEGORY_OF: Record<string, Category> = {
  'English': 'English', 'English as an Additional Language (EAL)': 'English', 'English Language': 'English', 'Literature': 'English',
  'General Mathematics': 'Mathematics', 'Mathematical Methods': 'Mathematics', 'Specialist Mathematics': 'Mathematics', 'Foundation Mathematics': 'Mathematics', 'Algorithmics (HESS)': 'Mathematics',
  'Biology': 'Sciences', 'Chemistry': 'Sciences', 'Physics': 'Sciences', 'Psychology': 'Sciences', 'Environmental Science': 'Sciences', 'Agricultural and Horticultural Studies': 'Sciences',
  'Economics': 'Business', 'Accounting': 'Business', 'Business Management': 'Business', 'Legal Studies': 'Business', 'Industry and Enterprise': 'Business',
  'Health and Human Development': 'Health & PE', 'Physical Education': 'Health & PE', 'Outdoor and Environmental Studies': 'Health & PE', 'Food Studies': 'Health & PE',
  'Art Making and Exhibiting': 'Arts', 'Art Creative Practice': 'Arts', 'Theatre Studies': 'Arts', 'Dance': 'Arts', 'Drama': 'Arts', 'Media': 'Arts', 'Visual Communication Design': 'Arts',
  'Music Composition': 'Arts', 'Music Inquiry': 'Arts', 'Music Contemporary Performance': 'Arts', 'Music Repertoire Performance': 'Arts',
  'Applied Computing: Data Analytics': 'Technology', 'Applied Computing: Software Development': 'Technology', 'Product Design and Technologies': 'Technology', 'Systems Engineering': 'Technology',
  'Classical Studies': 'Humanities', 'History: Revolutions': 'Humanities', 'History: Australian History': 'Humanities', 'History: Ancient History': 'Humanities',
  'Geography': 'Humanities', 'Sociology': 'Humanities', 'Philosophy': 'Humanities', 'Politics': 'Humanities', 'Religion and Society': 'Humanities', 'Texts and Traditions': 'Humanities',
}

/** Shorter names for the calendar, where the full one would crowd a day. */
const SHORT: Record<string, string> = {
  'English as an Additional Language (EAL)': 'EAL',
  'Mathematical Methods': 'Methods',
  'Specialist Mathematics': 'Specialist',
  'General Mathematics': 'General Maths',
  'Foundation Mathematics': 'Foundation Maths',
  'Chinese Second Language Advanced': 'Chinese SLA',
  'Chinese Second Language': 'Chinese SL',
  'Chinese First Language': 'Chinese FL',
  'Chinese Language, Culture and Society': 'Chinese LCS',
  'VET Information and Communications Technology': 'VET ICT',
}

export interface Subject {
  id: string
  name: string
  short: string
  category: Category
}

export interface Exam {
  subject: Subject
  /** 'Exam 1' / 'Exam 2' for two-paper subjects. */
  paper?: string
}

export interface Session {
  date: string
  start: string
  end: string
  exams: Exam[]
  note?: string
}

const slug = (s: string) => s.toLowerCase().replace(/\(.*?\)/g, m => (m === '(eal)' ? 'eal' : '')).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const subjectMap = new Map<string, Subject>()

function subjectFor(name: string): Subject {
  let s = subjectMap.get(name)
  if (!s) {
    const category: Category = CATEGORY_OF[name]
      ?? (name.startsWith('VET ') ? 'VET' : 'Languages')
    const id = name === 'English as an Additional Language (EAL)' ? 'eal' : slug(name)
    s = { id, name, short: SHORT[name] ?? name, category }
    subjectMap.set(name, s)
  }
  return s
}

export const SESSIONS: Session[] = RAW.map(r => ({
  date: r.date,
  start: r.start,
  end: r.end,
  note: r.note,
  exams: r.exams.map(e => {
    const m = e.match(/^(.*) Examination (\d)$/)
    return m ? { subject: subjectFor(m[1]), paper: `Exam ${m[2]}` } : { subject: subjectFor(e) }
  }),
})).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start))

export const SUBJECTS: Subject[] = [...subjectMap.values()].sort((a, b) => a.name.localeCompare(b.name))
export const SUBJECT_BY_ID = new Map(SUBJECTS.map(s => [s.id, s]))

/** Versions of one study a student takes only one of, so sharing a session isn't a clash. */
export const ALTERNATIVES: string[][] = [
  ['english', 'eal'],
  ['chinese-second-language', 'chinese-second-language-advanced'],
  ['music-contemporary-performance', 'music-repertoire-performance'],
]

export const DEFAULT_IDS = [
  'english', 'eal', 'mathematical-methods', 'specialist-mathematics', 'chemistry', 'physics',
  'chinese-first-language', 'chinese-second-language', 'chinese-second-language-advanced',
]
