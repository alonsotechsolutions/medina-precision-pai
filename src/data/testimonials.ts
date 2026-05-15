export interface Testimonial {
  name: string
  location: string
  rating: number
  text: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Jennifer Martinez',
    location: 'Warner Robins, GA',
    rating: 5,
    text: 'Eddie did an amazing job on our home. Professional, punctual, and the quality is outstanding. He really knows his craft. Highly recommend!',
  },
  {
    name: 'David Thompson',
    location: 'Atlanta, GA',
    rating: 5,
    text: 'Best painting contractor in Georgia! Eddie transformed our office space and stayed on budget. His expertise with different surfaces is impressive.',
  },
  {
    name: 'Sarah Williams',
    location: 'Macon, GA',
    rating: 5,
    text: 'From the free estimate to the final walkthrough, everything was handled with care and professionalism. Eddie selected the perfect paint for our project!',
  },
]
