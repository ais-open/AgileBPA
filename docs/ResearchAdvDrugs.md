First Step - Show count by Drug Reaction Outcomes for drug selected
  Query Example: https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:metformin+AND+patient.drug.drugcharacterization:1&count=patient.reaction.reactionoutcome

Explanation of query fields: patient.drug.medicinalProduct is common name used for drug in search; patient.drug.drugcharacterization is filtering by only drugs that are suspected to have caused reaction/adverse event and count=patient.reaction.reactionoutcome is a count of total adverse events by reaction outcome enumeration: 6=Unknown,5=Fatal,4=Recovered/Resolved with Chronic Condition,3=Not Recovered/Not Resolved,2=Recovering/Resolving,1=Recovered/Resolved

Second STep - When clicking on drug reaction outcome count, run the following query:https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:metformin+AND+patient.drug.drugcharacterization:1+AND+patient.reaction.reactionoutcome:5+AND+receivedate:[20040101+TO+20150622]&limit=5

Will need to take a few key pieces of information about event date, patient sex/age, reaction and list the drugs for the event  patient.drug.medicinalproduct for all 5 events returned.
