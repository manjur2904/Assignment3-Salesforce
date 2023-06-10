public with sharing class BoMDistiController {
    @AuraEnabled(cacheable=true)
    public static List<BoMDisti__c> getBoMDistiCombinedList(){
        try {
            return [
                SELECT Part_Number__c, Quantity_of_BoM__c, Quantity_of_Disti__c
                FROM BoMDisti__c
                ORDER BY Name
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<BoMDisti__c> getBoMList(){
        try {
            return [
                SELECT Part_Number__c, Quantity_of_BoM__c
                FROM BoMDisti__c
                WHERE Quantity_of_BoM__c != NULL
                ORDER BY Name
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<BoMDisti__c> getDistiList(){
        try {
            return [
                SELECT Part_Number__c, Quantity_of_Disti__c
                FROM BoMDisti__c
                WHERE Quantity_of_Disti__c != NULL
                ORDER BY Name
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}