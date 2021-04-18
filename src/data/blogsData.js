import aliza from '../images/aliza.png';
import henry from '../images/henry.png';
import winson from '../images/winson.png';

const blogsData = [
    {
        title: 'Check at least a doctor in a year for your teeth',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, placeat totam laborum maiores, esse assumenda',
        author: 'Dr. Cudi',
        authorImg: aliza,
        date: new Date().toDateString()
    },
    {
        title: 'Two times brush in a day can keep you healthy',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, placeat totam laborum maiores, esse assumenda',
        author: 'Dr. Sinthia',
        authorImg: henry,
        date: new Date().toDateString()
    },
    {
        title: 'The tooth cancer is taking a challenge',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, placeat totam laborum maiores, esse assumenda',
        author: 'Dr. John Mitchel',
        authorImg: winson,
        date: new Date().toDateString()
    },
]

export default blogsData;