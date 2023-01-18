import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const DetailUser = () => {

    const { data, error } = useSWR('../api/User', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log(data);
    return (
        <>
            <ul>
                {data.map(employee => (
                    <li key={employee.IdEmpleado} >
                        <div >{employee.NombreEmpleado}</div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DetailUser