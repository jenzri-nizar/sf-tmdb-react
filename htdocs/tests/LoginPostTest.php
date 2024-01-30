<?php

namespace App\Tests;
use http\Client;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpClient\NativeHttpClient;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class LoginPostTest extends TestCase
{

    public function testSomething()
    {
        $client = new NativeHttpClient();
        $data = array(
            'username' => 'test@sf.com',
            'password' => 'root@127'
        );
        $response = $client->request('POST', 'http://172.26.0.5:80/api/login_check', [
            "json" => $data
        ]);

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode( $response->getContent(), true);
        $this->assertArrayHasKey('token', $data);
    }
}
