<?php

namespace App\Entity\Enum;

enum Role: string
{
    case ADMIN = 'administrator';
    case EMPLOYEE = 'employee';
}