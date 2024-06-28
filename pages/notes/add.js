import dynamic from "next/dynamic";
import {
   Grid,
   GridItem,
   Card,
   Heading,
   Text,
   Button,
   Input,
   Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import useMutation from "@/hooks/useMutation";
const LayoutComponent = dynamic(() => import("@/layout"));

const AddNotes = () => {
   const { mutate } = useMutation();
   const router = useRouter();
   const [notes, setNotes] = useState({ title: '', description: '' });

   const handleSubmit = async () => {
      const resp = await mutate({
         url: 'https://service.pace-unv.cloud/api/notes',
         payload: notes,
         method: 'POST'
      });
      resp?.success && router.push("/notes");
      // try {
      //    const response = await fetch(
      //       "https://service.pace-unv.cloud/api/notes",
      //       {
      //          method: "POST",
      //          headers: {
      //             "Content-Type": "application/json",
      //          },
      //          body: JSON.stringify(notes),
      //       }
      //    );
      //    const result = await response.json();
      //    if (result?.success) {
      //       router.push("/notes");
      //    }
      // } catch (error) { }
   };

   return (
      <LayoutComponent metaTitle="Notes">
         <Card margin="5" padding="5">
            <Heading>Add Notes</Heading>
            <Grid gap="5">
               <GridItem>
                  <Text>Title</Text>
                  <Input
                     type="text"
                     onChange={(event) =>
                        setNotes({ ...notes, title: event.target.value })
                     }
                  />
               </GridItem>
               <GridItem>
                  <Text>Description</Text>
                  <Textarea
                     onChange={(event) =>
                        setNotes({ ...notes, description: event.target.value })
                     }
                  />
               </GridItem>
               <GridItem>
                  <Button onClick={handleSubmit} colorScheme="blue">
                     Submit
                  </Button>
               </GridItem>
            </Grid>
         </Card>
      </LayoutComponent>
   )
}

export default AddNotes;