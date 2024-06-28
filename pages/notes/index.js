import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
   Box,
   Flex,
   Grid,
   GridItem,
   Card,
   CardBody,
   CardHeader,
   CardFooter,
   Heading,
   Text,
   Button,
} from "@chakra-ui/react";

import useQueries from "@/hooks/useQueries";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
   const router = useRouter();
   const { data: listNotes } = useQueries({ prefixUrl: 'https://service.pace-unv.cloud/api/notes' })
   const [notes, setNotes] = useState();

   useEffect(() => {
      async function fetchingData() {
         const res = await fetch('https://service.pace-unv.cloud/api/notes');
         const listNotes = await res.json();
         setNotes(listNotes);
      }

      fetchingData();
   }, []);

   const HandleDelete = async (id) => {
      try {
         const response = await fetch(`https://service.pace-unv.cloud/api/notes/delete/${id}`, {
            method: "DELETE",
         });
         const result = await response.json();
         if (result?.success) {
            router.reload();
         }
      } catch (error) { }
   };

   return (
      <LayoutComponent metaTitle={"Notes"}>
         <Box padding="5">
            <Flex justifyContent="end">
               <Button
                  colorScheme="blue"
                  onClick={() => router.push("/notes/add")}
               >
                  Add Notes
               </Button>
            </Flex>
            <Flex>
               <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                  {listNotes?.data?.map((item, id) => (
                     <GridItem key={"key-" + id}>
                        <Card>
                           <CardHeader>
                              <Heading>{item?.title}</Heading>
                           </CardHeader>
                           <CardBody>
                              <Text>{item?.description}</Text>
                           </CardBody>
                           <CardFooter justify="space-between" flexWrap="wrap">
                              <Button
                                 onClick={() => router.push(`/notes/edit/${item?.id}`)}
                                 flex="1"
                                 variant="ghost"
                              >
                                 Edit
                              </Button>
                              <Button
                                 flex="1"
                                 colorScheme="red"
                                 onClick={() => HandleDelete(item?.id)}
                              >
                                 Delete
                              </Button>
                           </CardFooter>
                        </Card>
                     </GridItem>
                  ))}
               </Grid>
            </Flex>
         </Box>
      </LayoutComponent>
   );
}
