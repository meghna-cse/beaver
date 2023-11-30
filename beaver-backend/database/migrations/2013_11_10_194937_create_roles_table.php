<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();

            // unique constraint
            $table->unique('name');
        });

        // default roles
        DB::table('roles')->insert([
            ['name' => 'student'],
            ['name' => 'coordinator'],
            ['name' => 'administrator'],
            ['name' => 'qa'],
            ['name' => 'instructor'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
