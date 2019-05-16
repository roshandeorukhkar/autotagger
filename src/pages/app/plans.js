import React, {Component} from 'react';
import {
   Page, 
   AppProvider,
   Card,
   Stack,
   Subheading,
   Button
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
class Plans extends Component {
    render() {
       return (
         <AppProvider>
            <Page
               title="Choose your plan"
               >
               <Card>
                  <Card.Section
                     title={
                        <Stack>
                        <Subheading>14 days free</Subheading>
                        </Stack>
                     }
                  >
                     
                  <p className="marginTop">List of products here</p>
                  <Button onClick={this.selectPlan}>Select</Button>
                  </Card.Section>
               </Card>
               <Card>
                  <Card.Section
                     title={
                        <Stack>
                        <Subheading>Basic</Subheading>
                        
                        </Stack>
                     }
                  >
                     
                     <p>5 USD per month</p>
                     <p>unlimited rules</p>
                     <p>500 tag trigger per month</p>
                     <Button onClick={this.selectPlan}>Select</Button>
                  </Card.Section>
               </Card>
               <Card>
                  <Card.Section
                     title={
                        <Stack>
                           <Subheading>Pro</Subheading>
                           
                        </Stack>
                     }
                  >
                     
                     <p>10 USD per month</p>
                     <p>unlimited rules</p>
                     <p>unlimited tag trigger per month</p>
                     <p>unlimited email, slack and telegram integration</p>
                     <Button onClick={this.selectPlan}>Select</Button>
                  </Card.Section>
               </Card>
            </Page>
         </AppProvider>
       )
    }

   selectPlan = (planValue) => {
       console.log(planValue)
      this.setState({planName: planValue})
   };

    
 }
 export default Plans;