import axios from 'axios';

function assignButlers(clientRequests) {
  return axios.post('/allocate-bulters', {clientRequests})
    .then(({ data }) => data);
}

export default { assignButlers };
