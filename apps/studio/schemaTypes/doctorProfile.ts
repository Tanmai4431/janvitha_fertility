import { defineType, defineField } from 'sanity';
import { UserIcon } from '@sanity/icons/User';

export const doctorProfile = defineType({
  name: 'doctorProfile',
  title: 'Doctor & Specialist Profile',
  type: 'document',
  icon: UserIcon,
  preview: {
    select: {
      name: 'name',
      designation: 'designation',
      media: 'image',
    },
    prepare({ name, designation, media }) {
      return {
        title: name ? `👨‍⚕️ ${name}` : '👨‍⚕️ Doctor / Specialist Profile',
        subtitle: designation || 'Specialist Details & Portrait Photo',
        media,
      };
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Doctor / Specialist Full Name',
      type: 'string',
      description: 'Full name with title (e.g. "Dr. P. Bharathi").',
      validation: (Rule) => Rule.required(),
      initialValue: 'Dr. P. Bharathi',
    }),
    defineField({
      name: 'designation',
      title: 'Medical Title & Designation',
      type: 'string',
      description: 'Primary clinical specialty designation (e.g. "Consultant Obstetrician & Gynaecologist").',
      initialValue: 'Consultant Obstetrician & Gynaecologist',
    }),
    defineField({
      name: 'experience',
      title: 'Experience Highlight / Subtitle',
      type: 'string',
      description: 'e.g. "15+ Years Experience in Reproductive Medicine & Fetal Diagnostics".',
      initialValue: '15+ Years Experience',
    }),
    defineField({
      name: 'image',
      title: 'Doctor / Specialist Portrait Photo',
      type: 'image',
      description: 'Upload high-resolution doctor portrait photograph (PNG, WebP, or JPG).',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Doctor Biography / Clinical Overview',
      type: 'text',
      rows: 5,
      description: 'Detailed clinical background, medical expertise, and compassionate care philosophy.',
      initialValue: 'Specialist in Reproductive & Fetal Medicine (UK), dedicated to personalized fertility solutions, advanced IVF protocols, and compassionate care.',
    }),
    defineField({
      name: 'qualifications',
      title: 'Degrees, Fellowships & Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of medical degrees, fellowships, and accreditations.',
      initialValue: [
        'Fellow in Fetal Medicine, FMF (UK)',
        'Recognised Fellowship in Reproductive Medicine',
      ],
    }),
    defineField({
      name: 'specialties',
      title: 'Key Clinical Specialties & Focus Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Specific clinical areas of expertise (e.g. "Advanced ART & IVF", "Recurrent Implantation Failure", "Fetal Ultrasound Diagnostics").',
    }),
    defineField({
      name: 'directPhone',
      title: 'Direct Consultation Contact Number',
      type: 'string',
      description: 'Direct phone number for doctor appointments (falls back to main clinic phone if empty).',
    }),
  ],
});
