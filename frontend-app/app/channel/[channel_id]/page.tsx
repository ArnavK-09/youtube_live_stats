export default function ViewChannel({ params }: { params: { channel_id: string } }) 
{
    return (
        <> <div>My Post: {params.channel_id}</div>
        </>
    )
}