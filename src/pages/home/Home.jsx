import { Badge, Card, Group, Image, Text } from "@mantine/core";
import { useLoaderData } from "react-router-dom";

const Home = () => {

    const data = useLoaderData()
    console.log(data);

    return (
        <div className=' px-8 md:px-20 py-8'>
            <h1 className="text-4xl text-[#1f3e72] font-bold pb-4 text-center">All Houses</h1>
            {/* Search field */}
            <div className="mb-4 items-center flex justify-center">
                <input
                    type="text"
                    placeholder="Search by property name..."
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-2 border-2 border-gray-500 rounded-md lg:w-1/2"
                />
            </div>
            <div className='grid lg:grid-cols-3 gap-4'>

                {data?.map(item => (
                    <div key={item._id}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Card.Section>
                                <Image
                                    src={item.image}
                                    height={160}
                                    alt="Norway"
                                />
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text className='text-[#1f3e72] text-2xl ' fw={700}> {item?.name}</Text>
                                <Badge className='text-sm' color="orange">$ {item?.price}</Badge>
                            </Group>

                            <Text size="sm" c="dimmed">{item?.description}</Text>


                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;