// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HeritageInsurance {
    // Struct for Policy details
    struct Policy {
        uint id;
        address policyHolder;
        string policyNumber;
        uint premium;
        bool active;
    }
    
    uint public policyCount;
    mapping(uint => Policy) public policies;
    
    // Event for logging policy issuance
    event PolicyIssued(uint policyId, address policyHolder, string policyNumber, uint premium);
    
    // Function to issue a new policy
    function issuePolicy(string memory _policyNumber, uint _premium) public {
        policyCount++;
        policies[policyCount] = Policy(policyCount, msg.sender, _policyNumber, _premium, true);
        emit PolicyIssued(policyCount, msg.sender, _policyNumber, _premium);
    }
    
    // Additional functions can be added here (e.g., filing claims, processing premium payments)
}
