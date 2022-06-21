import { Static, Type } from '@sinclair/typebox'

import { id } from '.'

const time=Type.Object({
    from:Type.Number(),
    to:Type.Number(),
    day:Type.Number(),
    teacher:Type.String()
})

const section =Type.Object({
    section:Type.String(),
    times:Type.Array(time)

})

const course =Type.Object({
    code:Type.String(),
    career:Type.String(),
    name:Type.String(),
    sections : Type.Array(section)

})
type Course = Static<typeof course>

const courseDto = Type.Object({
    id:Type.Optional(id),
    code:Type.String(),
    career:Type.String(),
    name:Type.String(),
    sections:Type.Array(section),
    createdAt: Type.Optional(Type.String()),
    updatedAt: Type.Optional(Type.String())

})

type CourseDTO = Static<typeof courseDto>

const storeCourseSchema=Type.Object({
    args:course
})

type storeCourse=Static<typeof storeCourseSchema>

export {Course,CourseDTO,storeCourseSchema,storeCourse}