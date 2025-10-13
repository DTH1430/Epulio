import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sampleProfiles = [
  {
    name: 'Alice Nguyen',
    bio: 'Frontend Developer passionate about creating beautiful and performant web applications. Specialized in React and Next.js with a keen eye for design.',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'],
    socials: {
      github: 'https://github.com/alicenguyen',
      linkedin: 'https://linkedin.com/in/alicenguyen',
      twitter: 'https://twitter.com/alicenguyen',
      website: 'https://alicenguyen.dev'
    },
    projects: [
      {
        title: 'E-commerce Platform',
        description: 'Built a full-featured e-commerce platform with Next.js and Stripe integration',
        url: 'https://github.com/alicenguyen/ecommerce',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop'
      },
      {
        title: 'Portfolio Builder',
        description: 'A no-code portfolio builder for designers and developers',
        url: 'https://github.com/alicenguyen/portfolio-builder',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop'
      }
    ]
  },
  {
    name: 'Bao Tran',
    bio: 'UI/UX Designer with 5+ years of experience creating user-centered digital experiences. Proficient in Figma, design systems, and frontend development.',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    skills: ['Figma', 'UI/UX Design', 'Tailwind CSS', 'Design Systems', 'Prototyping', 'User Research'],
    socials: {
      github: 'https://github.com/baotran',
      linkedin: 'https://linkedin.com/in/baotran',
      website: 'https://baotran.design'
    },
    projects: [
      {
        title: 'Banking App Redesign',
        description: 'Complete redesign of a mobile banking application focusing on accessibility',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop'
      },
      {
        title: 'Design System',
        description: 'Created a comprehensive design system for a SaaS product',
        url: 'https://www.figma.com/baotran/design-system',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'
      }
    ]
  },
  {
    name: 'Duy Le',
    bio: 'Backend Engineer specializing in scalable systems and database optimization. Expert in Node.js, PostgreSQL, and cloud infrastructure.',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'AWS', 'TypeScript', 'GraphQL', 'Redis'],
    socials: {
      github: 'https://github.com/duyle',
      linkedin: 'https://linkedin.com/in/duyle',
      twitter: 'https://twitter.com/duyle_dev'
    },
    projects: [
      {
        title: 'Real-time Analytics API',
        description: 'Built a high-performance analytics API handling 10M+ requests/day',
        url: 'https://github.com/duyle/analytics-api',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
      },
      {
        title: 'Microservices Architecture',
        description: 'Designed and implemented a scalable microservices architecture using Docker and Kubernetes',
        url: 'https://github.com/duyle/microservices',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop'
      }
    ]
  }
];

async function seed() {
  console.log('Starting seed...');

  try {
    // Delete existing profiles
    const { error: deleteError } = await supabase
      .from('profiles')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.error('Error deleting existing profiles:', deleteError);
    }

    // Insert sample profiles
    const { data, error } = await supabase
      .from('profiles')
      .insert(sampleProfiles)
      .select();

    if (error) {
      console.error('Error inserting profiles:', error);
      process.exit(1);
    }

    console.log('Successfully seeded profiles:', data);
    console.log(`Inserted ${data?.length} profiles`);
    process.exit(0);
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

seed();
