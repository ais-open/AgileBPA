# AGILE DELIVERY SERVICES BPA (4QTFHS150004) PROTOYPE – My Medicine Cabinet

References:

| Prototype URL | [http://agilebpa-ui.cfapps.io/](http://agilebpa-ui.cfapps.io/) |
| --- | --- |
| GitHub Main Branch | master |
| Installation Document | [https://github.com/AppliedIS/AgileBPA/blob/master/INSTALL.md](https://github.com/AppliedIS/AgileBPA/blob/master/INSTALL.md)   |
| Developer Document | [https://github.com/AppliedIS/AgileBPA/blob/master/DEVELOP.md](https://github.com/AppliedIS/AgileBPA/blob/master/DEVELOP.md) |
| Style Guide | [http://agilebpa-ui.cfapps.io/style-guide.html](http://agilebpa-ui.cfapps.io/style-guide.html) |
| Trello Board | [https://trello.com/b/0PNEKo3f/18f-bpa-ideas](https://trello.com/b/0PNEKo3f/18f-bpa-ideas) |
| GitHub Issue Log | [https://github.com/AppliedIS/AgileBPA/issues?utf8=%E2%9C%93&q=is%3Aissue](https://github.com/AppliedIS/AgileBPA/issues?utf8=%E2%9C%93&q=is%3Aissue) |
| Travis CI | https://travis-ci.org/AppliedIS/AgileBPA/  |
| Wireframes | [https://github.com/AppliedIS/AgileBPA/blob/master/docs/Wireframes1.md](https://github.com/AppliedIS/AgileBPA/blob/master/docs/Wireframes1.md), [https://github.com/AppliedIS/AgileBPA/blob/master/docs/Wireframes2.md](https://github.com/AppliedIS/AgileBPA/blob/master/docs/Wireframes2.md), [https://github.com/AppliedIS/AgileBPA/blob/master/docs/Wireframes3.md](https://github.com/AppliedIS/AgileBPA/blob/master/docs/Wireframes3.md) |
| Personas | [https://github.com/AppliedIS/AgileBPA/blob/master/docs/Personas.md](https://github.com/AppliedIS/AgileBPA/blob/master/docs/Personas.md) |
| Usability Survey | [https://github.com/AppliedIS/AgileBPA/blob/master/docs/UsabilityTesting.md](https://github.com/AppliedIS/AgileBPA/blob/master/docs/UsabilityTesting.md) |
| Adverse Events Research | [https://github.com/AppliedIS/AgileBPA/blob/master/docs/ResearchAdvDrugs.md](https://github.com/AppliedIS/AgileBPA/blob/master/docs/ResearchAdvDrugs.md) |
| Drug Interaction Research | [https://github.com/AppliedIS/AgileBPA/blob/master/docs/ResearchDrugInter.md](https://github.com/AppliedIS/AgileBPA/blob/master/docs/ResearchDrugInter.md) |
| Style Tiles | [https://github.com/AppliedIS/AgileBPA/blob/master/docs/StyleTiles.md](https://github.com/AppliedIS/AgileBPA/blob/master/docs/StyleTiles.md) |
| Color Palette Survey Results | [https://goo.gl/u48GRT](https://goo.gl/u48GRT) |
| Final Quality Acceptance Test | [https://github.com/AppliedIS/AgileBPA/blob/master/docs/FinalQA.md](https://github.com/AppliedIS/AgileBPA/blob/master/docs/FinalQA.md) |
| Final Quality Acceptance Test Results | [https://github.com/AppliedIS/AgileBPA/blob/master/docs/FinalQATestResults.xlsx](https://github.com/AppliedIS/AgileBPA/blob/master/docs/FinalQATestResults.xlsx)  |
| Continuous Monitoring Service | [https://github.com/AppliedIS/AgileBPA/blob/master/docs/ConMon.md](https://github.com/AppliedIS/AgileBPA/blob/master/docs/ConMon.md) |

For the Agile Delivery Service (ADS) prototype, the Applied Information Sciences (AIS) team developed an application called My Medicine Cabinet which enables the public to track their medications, identify any potential adverse interactions, and quickly see any applicable recalls.  Users enter information about medicines they take and medicines that are in their home.

AIS has been building software since 1982.  We have existed so long because we build useful software with techniques and technologies that result in value and efficiency for our clients.  We have helped customers like the FBI and US Treasury expand their enterprise Agile approach. We have succeeded in adapting our Agile practices to meet the challenges that federal customer face (e.g. FISMA, budgeting, and planning processes).

For this prototype, we used seven of the specific labor categories as described in the RFQ:

- Product Manager (Jason McNutt) - Responsible for the vision, delivery and overall quality of the product.  
- Technical Architect - Responsible for the technical vision and architecture to meet functional and system requirements of the prototype as well as evaluating security requirements and defining a long term vision for improving application security.  
- Integration Designer/User Researcher/Usability Tester - Responsible for improving usability and responding to survey enhancements.  
- Visual Designer - Created Personas and wireframes, as well as assisting in the style guide and palette creation.  
- Backend Web Developer - Responsible for providing integration, configuring data environment, and creating API's.  
- Frontend Web Developer -Responsible for developing user interface using HTML 5, JavaScript and using design standards.  
- DevOps Engineer - Responsible for Cloud Foundry environment, setup and configuration of Docker containers for development database.  

Throughout the development effort our team followed multiple plays from the US Digital Services Playbook.  We attempted to understand what people needed through crowdsourcing our ideas, focused on a simple and intuitive interface, utilized an agile and iterative approach, assigned one leader in our Product Manager, used a modern technology stack and defaulted to open source software and working in the open.  In our approach to deliver we used four of the five phases of the Gov.UK approach to Digital Service Delivery (Discovery, Alpha, Beta, Live) to provide a lightweight structure around the delivery of our prototype. The prototype demonstrates our ability to leverage multiple open technologies and showcases how quickly our teams form to build solutions.  We used several human centric design approaches to improve usability of the prototype (Usability Testing Surveys, Wireframes, Use Cases, and Personas).   Once developed, we used AIS employees to gauge usefulness and intuitiveness using Yammer to invite feedback from a diverse group.  A summary of activities during each phase is described below:

1. Discovery - The project began with 3 parallel tasks: 1) crowdsourcing (the "crowd" consisted of a wide and diverse group of AIS employees) ideas for the prototype within AIS using a [Trello board](https://trello.com/b/0PNEKo3f/18f-bpa-ideas); 2) standing up source control in GitHub; and 3) research efforts performed around the FDA open APIs. Following the principles of keeping simple functionality first, the development team defined release goals and use cases. The team used [GitHub issues](https://github.com/AppliedIS/AgileBPA/issues?utf8=%E2%9C%93&q=is%3Aissue) to define the product Backlog using a broad use case syntax (ex. As a User, I would like to perform an action).  Issues are assigned a label and a milestone if applicable.    

2. Alpha - Starting in the Alpha phase, the assembled team began daily scrum calls. We entered use cases into GitHub as Issues and established milestones based on service delivery phases. The team began to organically assign themselves tasks. The Product Manager and Technical Architect led the scrum making decisions and resolving issues. During this phase, the team built the scaffolding for the front end using HTML, JavaScript, CSS, AngularJS, and Bootstrap. The team built the backend using the FDA API's, a MongoDB lab instance for persistent store, and server technology using Node.js/hapi.js. We used Cloud Foundry for the web hosting Platform-as-a-Service and [Travis CI](https://travis-ci.org/AppliedIS/AgileBPA/) as a continuous integration platform. Finally, the team developed wireframes, identified target audiences developing primary and secondary [personas](https://github.com/AppliedIS/AgileBPA/blob/master/docs/Personas.md) representing the target. Using the AIS Yammer site and following HCD design, wireframe [usability was surveyed](https://github.com/AppliedIS/AgileBPA/blob/master/docs/UsabilityTesting.md).  
3. Beta - Once Alpha was released the team initiated planning for remaining use cases and any/all discovered issues. In the second iteration, the team developed core prototype functionality including:  

  a. Entering and Maintaining user profile.  
  b. Searching FDA label API to find medications.    
  c. Adding Medication to your cabinet.  
  d. Maintaining a list of all medications entered.  
  e. Providing a medications view that pulls information from the label API a the Adverse Event API available at openFDA.  
  f. Implementing "Sweet Alerts" for notifications.  

    The team performed Research Spikes to resolve issues with the openFDA API datasets, and to better understand the completeness of the data ([Adverse Events Research](https://github.com/AppliedIS/AgileBPA/blob/master/docs/ResearchAdvDrugs.md) and [Drug Interaction Research](https://github.com/AppliedIS/AgileBPA/blob/master/docs/ResearchDrugInter.md)).  The team built the [CSS Style Tiles](https://github.com/AppliedIS/AgileBPA/blob/master/docs/StyleTiles.md) and posted to the GitHub repository.  They developed the base CSS using the palette chosen during usability testing – [the cool palette](https://goo.gl/u48GRT).

4. Live - The team planned the Live release with an emphasis on resolving remaining issues, improving performance, and       preparing final packaging.  Minor changes were applied to the user interface improving the overall usability of the prototype. Before the final release of the prototype, the team performed a [final Quality Acceptance](https://github.com/AppliedIS/AgileBPA/blob/master/docs/FinalQA.md) test across 14 pieces of functionality. Once these all [passed their acceptance criteria](https://github.com/AppliedIS/AgileBPA/blob/master/docs/FinalQATestResults.xlsx) the prototype was released.  The team added a continuous monitoring service through Cloud Foundry called [New Relic](https://github.com/AppliedIS/AgileBPA/blob/master/docs/ConMon.md). The team enabled basic application performance monitoring that, in future releases, would provide security monitoring around the user's profile and medication information.  For this functionality, the team would use the New Relic dashboard and alerts to analyze/report and respond to any security risks.  Then, iteratively review the risk posture to address any necessary changes or updates.

My Medicine Cabinet contains profile information as well as prescription drug information unique to the user.  This information would certainly in practice require a more robust security framework.  During future releases, our team would seek to bolster this with data at rest encryption within MongoDB and encrypted traffic between Cloud Foundry and the MongoDB instance.  In addition to improving security, we would seek to expand the capability of the application to collect adverse events from the users for drugs in their cabinet and report that back to the FDA.  Open and constant communication with the public would lead to increased awareness of potential risks and broaden the FDA's understanding of the effects.  Finally, in an effort to invite participation from Industry, we would look to integrate with pharmacies' APIs, such as Walgreen's and CVS allowing users to automatically include prescriptions directly into their cabinet.

