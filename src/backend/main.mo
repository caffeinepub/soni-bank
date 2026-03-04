import List "mo:core/List";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Float "mo:core/Float";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  public type BankAccount = {
    user : Text;
    accountType : AccessControl.UserRole;
    balance : Float;
    transactions : List.List<Transaction>;
  };

  public type Transaction = {
    transactionId : Nat32;
    fromUser : Text;
    toUser : ?Text;
    transactionType : TransactionType;
    amount : Float;
    timestamp : Int;
  };

  public type TransactionType = {
    #deposit;
    #withdrawl;
    #transfer;
  };

  public type Ledger = {
    accounts : Map.Map<Text, BankAccount>;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
};
