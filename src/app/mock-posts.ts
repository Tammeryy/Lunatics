import { Post } from './post';

export const POST: Post = {
  title: 'Watch Youtube',
  description: 'Procrastination service',
  poster_name: 'Tex',
  task_budget: 5,
  task_open: true,
  due_date: '10 October 2018',
  location: 'Lazy Town'
}

export const POSTS: Post[] = [
  {
    title: 'Cook for 50-people event',
    description: 'Cater for a wedding event with various options (vegan, vegetarian, etc..)',
    poster_name: 'Steven',
    task_budget: 1500,
    task_open: true,
    due_date: '1 April 2017',
    location: 'Sesame Street'
  },
  {
    title: 'Clean the house',
    description: 'Clean the house before 3pm today',
    poster_name: 'Emily',
    task_budget: 1254,
    task_open: true,
    due_date: '2 April 2017',
    location: 'Soya Street'
  },
  {
    title: "Buy and deliver groceries",
    description: "Buy groceries at specified shops given a to-buy list",
    poster_name: "Steven",
    task_budget: 30,
    task_open: true,
    due_date: '2 April 2017',
    location: 'Soya Street'
  },
  {
    title: "Send message to friends",
    description: "Type what I say and send to my friends",
    poster_name: "Tracey",
    task_budget: 10,
    task_open: false,
    due_date: '2 April 2017',
    location: 'Soya Street'
  },
  {
    title: "Drive to airport",
    description: "Drive me and my family to the airport before 10am",
    poster_name: "Chrissy",
    task_budget: 80,
    task_open: true,
    due_date: '2 April 2017',
    location: 'Soya Street'
  }
];
