public with sharing class UnifiedDataController {
    @AuraEnabled
    public static List<UnifiedData__c> getResultantList(){
        Assignment2.Solution();
        try {
            return [
                SELECT BoM_Port_Number__c, Bom_Quantity__c, Disti_Port_Number__c, Disti_Quantity__c, Error_Flag__c
                FROM UnifiedData__c
                ORDER BY Name
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}