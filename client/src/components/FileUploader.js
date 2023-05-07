import React, { useState } from 'react';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react';
import axios from 'axios'

var cloth, person;

function FileUploader() {
    const [clothName, setClothName] = useState('');
    const [personName, setPersonName] = useState('');

    function handleFileUpload(event) {
        const { name, files } = event.target;
        if (name === 'cloth') {
            setClothName(files[0].name);
        } else if (name === 'person') {
            setPersonName(files[0].name);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Cloth name:', clothName);
        console.log('Person name:', personName);
        cloth = clothName;
        person = personName;

        console.log("Wassup")

        const s = personName + "+" + clothName
        console.log(s)

        axios.get(`http://localhost:8080/${s}`).then(
            res => {
                console.log(res)
            }
        );

}

return (
    <Center h="100vh" bg="#F5F5F5">
        <VStack spacing={6} w="xl" p={8} bg="white" boxShadow="lg" rounded="xl">
            <Box w="100%">
                <Heading size="lg" textAlign="center" fontFamily="Montserrat" fontWeight="bold">
                    Upload Images
                </Heading>
            </Box>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <FormControl>
                    <FormLabel fontFamily="Montserrat" fontWeight="bold">Select cloth image:</FormLabel>
                    <Input type="file" name="cloth" onChange={handleFileUpload} mb={4} />
                </FormControl>
                <FormControl>
                    <FormLabel fontFamily="Montserrat" fontWeight="bold">Select person image:</FormLabel>
                    <Input type="file" name="person" onChange={handleFileUpload} mb={4} />
                </FormControl>
                <Button
                    type="submit"
                    disabled={!clothName || !personName}
                    w="24vw"
                    bg="#008CBA"
                    color="white"
                    _hover={{ bg: '#007A9D' }}
                    rounded="full"
                    fontFamily="Montserrat"
                    fontWeight="bold"
                    fontSize="md"
                    p={4}
                >
                    Upload
                </Button>
            </form>
            {clothName && (
                <Box w="100%" bg="#EDEDED" p={6} rounded="xl">
                    <Text fontSize="sm" fontWeight="bold" mb={2}>
                        Selected cloth image:
                    </Text>
                    <Text fontSize="md" fontFamily="Montserrat">
                        {clothName}
                    </Text>
                </Box>
            )}
            {personName && (
                <Box w="100%" bg="#EDEDED" p={6} rounded="xl">
                    <Text fontSize="sm" fontWeight="bold" mb={2}>
                        Selected person image:
                    </Text>
                    <Text fontSize="md" fontFamily="Montserrat">
                        {personName}
                    </Text>
                </Box>
            )}
        </VStack>
    </Center>
);
}

export default FileUploader;
export { cloth, person };
