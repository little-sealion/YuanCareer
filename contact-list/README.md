Step 1: Break The UI Into A Component Hierarchy 
· MainPage
    · Header
    - "Contact List"

    · Search Bar
    - input form
    - search the ContactItem by ContactItemContent
    - background-color change by on-click

    · Add contact
    - Button with " ADD "
    - router/link to contactCard      
    
    · ContactList
    - randering all list of ContactItems

            · ContactCard
            - call ContactCard component
            - write an add button

        · ContactItem
        - Present a contact info with delete and edit function

            · ContactItemContent
            - Present a contact name/email/mobile info

            · ContactItemEdit
            - An edit button and link to ContactCard

                · ContactCard
                - all contact information default filled in
                - call ContactCard component
                - write a submit button
                
            · ContactItemDelete
            - a detele button and trigger the delete of ContactItem

· Subpage 
    · ContactCard

        · ContactContent
        - Contact Information
            · Name
            · Email
            · mobile
            
        · Button
        - import different button name


 
Step 2: Build A Static Version in React
Step 3: Identify The Minimal (but complete) Representation Of UI State
Step 4: Identify Where Your State Should Live
Step 5: Add Inverse Data Flow