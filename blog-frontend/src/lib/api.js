import axios from 'axios'

export const writePost = ({ title, body, tags }) => 
  axios.get('/api/posts', {title, body, tags})