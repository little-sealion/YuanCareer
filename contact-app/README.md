Step 1: Break The UI Into A Component Hierarchy 
· MainPage
    · Header
    - "Contact List"

    · Add contact
    - Button with " ADD "
    - router/link to contactCard      
    
    · Contact List
    - randering all list of ContactItems

       · Search Bar
        - input form
        - search the ContactItem by ContactItemContent
        - background-color change by on-click 

        · Contact Card
        - Present a contact info with delete and edit function

            · Contact Content
            - Present a contact name/email/mobile info

            · EditContactItem
            - An edit button and link to ContactCard
                
            · DeleteContactItem
            - a detele button and trigger the delete of ContactItem

· Subpage 
    · AddContact
        · ContactContent
        - Contact Information
            · Name
            · Email
            · mobile         
        · Button
        -  write an add button

   · EditContact
        - all contact information default filled in
        - Contact Content
        - write a submit button


 
Step 2: Build A Static Version in React
Step 3: Identify The Minimal (but complete) Representation Of UI State


Step 4: Identify Where Your State Should Live
Step 5: Add Inverse Data Flow