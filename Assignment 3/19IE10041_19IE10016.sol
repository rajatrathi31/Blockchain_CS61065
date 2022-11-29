/* Address of Contract: 0x548Eb654634E42ea33087F8e344468AA9adcd21d

Name: Rajat Rathi, Roll Number: 19IE10041

Run the code using 0.4.22 compiler
*/

pragma solidity >=0.4.22 <0.6.0;

contract Morra {
    address public player1;
    address public player2;
    uint256 public bet1;
    uint256 public bet2;
    uint256 public count;
    bytes32 private player1_hashval;
    bytes32 private player2_hashval;
    bytes32 public player1_val = -1;
    bytes32 public player2_val = -1;
    address public winner_player;
    uint256 public balance;

    constructor() public {
        count = 0;
    }

    function initialize() public payable returns (uint) {
        require(msg.value > 1e15, "Bet Amount should be greater than 10^-3 ether");

        if(count == 0){
            count = 1;
            player1 = msg.sender;
            bet1 = msg.value;
            return 1;
        }else if(count == 1){
            count = 2;

            require(msg.sender != player1, "Same player can not initialize twice");
            require(msg.value > bet1, "Player 2's bet should be greater than Player 1's bet");

            player2 = msg.sender;
            bet2 = msg.value;
            return 2;
        }
        return 0;
    }

    function commitmove(bytes32 hashMove) public returns (bool) {
        require(count == 2, "Both players should register their bids");

        require(msg.sender == player1 || msg.sender == player2, "Player not recognised");

        if(msg.sender == player1) {
            require(player1_hashval == 0, "Player already committed");
            player1_hashval = hashMove;
        }else {
            require(player2_hashval == 0, "Player already committed");
            player2_hashval = hashMove;
        }
        return true;
    }

    function revealmove(string memory revealedMove) public returns (int) {
        require(msg.sender == player1 || msg.sender == player2, "Player not recognised");
        require(player1_hashval != 0 && player2_hashval != 0, "Both Players should commit first");

        if (msg.sender == player1 && player1_val == -1) {
            require(player1_hashval == sha256(revealedMove), "Value does not match the hash");
            if (player1_hashval == sha256(revealedMove)) {
                player1_val = getFirstChar(revealedMove);
            }
        }
        else if (msg.sender == player2 && player2_val == -1) {
            require(player2_hashval == sha256(revealedMove), "Value does not match the hash");
            if (player2_hashval == sha256(revealedMove)) {
                player2_val = getFirstChar(revealedMove);
            }
        }

        if (player1_val != -1 && player2_val != -1){
            winner_player = decideWinner(player1_val, player2_val);
            distributeReward(winner_player);
            restartGame();
            return int(player1_val);
        }
        return -1;
    }

    function getFirstChar(string memory str) private pure returns (bytes32) {
        if (bytes(str)[0] == 0x30) {
            return 0;
        } else if (bytes(str)[0] == 0x31) {
            return 1;
        } else if (bytes(str)[0] == 0x32) {
            return 2;
        } else if (bytes(str)[0] == 0x33) {
            return 3;
        } else if (bytes(str)[0] == 0x34) {
            return 4;
        } else if (bytes(str)[0] == 0x35) {
            return 5;
        } else {
            return -1;
        }
    }

    function decideWinner(bytes32 player1_val, bytes32 player2_val) private returns (address) {
        if (player1_val == player2_val) {
            return player2;
        }
        return player1;
    }

    function distributeReward(address winner_player) private {
        winner_player.transfer(bet1 + bet2);
    }

    function restartGame() internal {
        player1 = 0;
        player2 = 0;
        bet1 = 0;
        bet2 = 0;
        count = 0;
        player1_hashval = 0;
        player2_hashval = 0;
        player1_val = -1;
        player2_val = -1;
        winner_player = 0;
        balance = 0;
    }

    function getBalance() public view returns (uint) {
        balance = address(this).balance;
        return balance;
    }

    function getPlayerId() public view returns (uint) {
        if(msg.sender == player1) {
            return 1;
        } else if(msg.sender == player2) {
            return 2;
        }
        return 0;
    }
}