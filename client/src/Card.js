import { React } from 'react';

export default function Card({ data }) {
    const handleClick = () => {
        console.log(`Card ${data.volunteer_id} clicked`);
        window.location.href = `/check-in/${data.volunteer_id}`;
    };
    return (
        <div className='card' onClick={handleClick} style={{cursor: 'pointer'}}>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>LOCATION</th>
                    <th>START</th>
                    <th>END</th>
                    <th>LANYARD</th>
                </tr>
            </thead>
            <tbody>
            {/* {data.map((d, i) => { */}
                <tr>
                <td>{data.name}</td>
                <td>{data.location}</td>
                <td>{data.start_time}</td>
                <td>{data.end_time}</td>
                <td>{data.lanyard_id}</td>
                </tr>
            {/* })} */}
            </tbody>
        </table>
        </div>
    )
}
