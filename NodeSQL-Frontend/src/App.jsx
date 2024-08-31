import React, { useEffect, useState } from 'react'
import './styles/Roles.css'
const App = () => {
    const [servers, setServers] = useState([])
    const [groupsOnServers, SetgroupsOnServers] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);

    // useEffect(() => {
    //     fetch('http://localhost:5000/api/servers')
    //       .then(response => response.json())
    //       .then(data => setServers(data))
    //       .catch(error => console.error('Error fetching data:', error));
    //   }, []);

    useEffect(() => {
        // Fetch data from the backend API
        fetch('http://localhost:5000/api/groups-servers')
          .then(response => response.json())
          .then(data => SetgroupsOnServers(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);


      const handleSelectChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selected = groupsOnServers.find(server => server.id === selectedId);
        setSelectedOption(selected);
        // setDisplayData(selected ? selected.RoleName : null);
      };
    
  return (
    <>
    <div className="container">
      <h1>Browse Roles</h1>
      <div>
        <select onChange={handleSelectChange}>
          <option value="">Select an option</option>
          {groupsOnServers.map(server => (
            <option key={server.id} value={server.id}>
              {server.Sname}
            </option>
          ))}
        </select>
          <table border="1" style={{ marginTop: '20px', width: '100%' }}>
            <thead>
              <tr>
                <th>Server Name</th>
                <th>Role Name</th>
              </tr>
            </thead>
            <tbody>
        {selectedOption && (
              <tr>
                <td>{selectedOption.Sname}</td>
                <td>{selectedOption.RoleName.split(',').map((role, index) => (
                    <React.Fragment key={index}>
                      {role.trim()}
                      <br />
                    </React.Fragment>
                  ))}</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default App