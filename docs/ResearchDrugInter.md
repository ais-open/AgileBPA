Call the following openFDA query -   

https://api.fda.gov/drug/label.json?search=openfda.generic_name:metformin+AND+_exists_:drug_interactions&limit=1  

Use the drug_interactions field, problem is it is a run on string, sometimes it will come with html table with appended _table to it but that is not always the case you can see in this query result.
