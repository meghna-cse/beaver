<?php

namespace Beaver\Beaver\Utils;

use Beaver\Beaver\Configs\AppConfig;
use DateTimeImmutable;
use Exception;
use Lcobucci\JWT\JwtFacade;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Token\Builder;

class AuthUtil
{
    public static function jwtEncode($payload)
    {
        $header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
        $encodedHeader = base64_encode($header);

        $encodedPayload = base64_encode(json_encode($payload));

        $signature = hash_hmac('sha256', $encodedHeader . '.' . $encodedPayload, AppConfig::$app_secret_key, true);
        $encodedSignature = base64_encode($signature);

        return $encodedHeader . '.' . $encodedPayload . '.' . $encodedSignature;
    }

    /**
     * @throws Exception
     */
    public static function jwtDecode($token): bool
    {
        list($encodedHeader, $encodedPayload, $encodedSignature) = explode('.', $token);

        $calculatedSignature = base64_encode(hash_hmac('sha256', $encodedHeader . '.' . $encodedPayload, AppConfig::$app_secret_key, true));

        // Check if encoded signature and calculated signature are the same
        if ($calculatedSignature === $encodedSignature) {
            // Signature is valid
            $header = json_decode(base64_decode($encodedHeader), true);
            $payload = json_decode(base64_decode($encodedPayload), true);

            return true;
        } else {
            return false;
        }
    }

    public static function verifyToken(): bool
    {
        $headers = apache_request_headers();
        if(!isset($headers['Authorization'])){
            return false;
        }
        $token = $headers['Authorization'];

        $token = str_replace('Bearer ', '', $token);
        $token = str_replace('"', '', $token);

        try{
            return AuthUtil::jwtDecode($token);
//            return $payload;
//            return true;
        }catch (Exception $e){
            return false;
        }
    }
}