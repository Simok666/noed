<?php

namespace Database\Factories;

use App\ChatStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChatStatusFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
     protected $model = ChatStatus::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            [
                'status' => 'Open',
                'descriptions' => 'Request Chat Forum'
            ],
        ];
    }
}
