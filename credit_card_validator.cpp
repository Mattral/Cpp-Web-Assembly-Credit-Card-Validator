// credit_card_validator.cpp

#include <string>
#include <algorithm>

bool is_credit_card_valid(const std::string& cardNumber) {
    int sum = 0;
    bool alternate = false;

    // Start from the rightmost digit
    for (int i = cardNumber.length() - 1; i >= 0; --i) {
        int digit = cardNumber[i] - '0';

        if (alternate) {
            digit *= 2;
            if (digit > 9) {
                digit = (digit % 10) + 1;
            }
        }

        sum += digit;
        alternate = !alternate;
    }

    return sum % 10 == 0;
}
